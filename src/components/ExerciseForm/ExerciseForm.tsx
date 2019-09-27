import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

import { Button, DropdownProps, Form, Grid, Select } from 'semantic-ui-react';

import { IMuscleGroup } from '../../models/muscle-group.interface';
import { IExercise } from '../../models/exercise.interface';
import Spinner from '../../shared/Spinner/Spinner';


interface IState {
  name: string;
  muscleGroupId: number;
  weight: number;
}

interface IProps {
  exercisesStore?: {
    isLoading: boolean;
    isAdded: boolean;
    isUpdated: boolean;
    addExercise: (exercise: IExercise) => any;
    updateExercise: (exercise: IExercise) => any;
    clearState: () => any;
  };
  muscleGroupsStore?: {
    muscleGroups: IMuscleGroup[];
    isLoading: boolean;
    getMuscleGroups: () => any;
  };
  editedExercise?: IExercise;
  setModalOpen?: (value: boolean) => any;
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px'
  },
  mainGrid: {
    padding: '2em',
    display: 'flex',
    flexDirection: 'column'
  },
  formControl: {
    margin: '1em',
    minWidth: 120,
  },
  submitBtn: {
    marginTop: '3em',
  }
};

const ExerciseForm: FC<IProps> = inject('exercisesStore', 'muscleGroupsStore')(
  observer(({
  exercisesStore,
  muscleGroupsStore,
  editedExercise,
  setModalOpen,
}) => {

  const initialState: IState = editedExercise ? editedExercise : {
    name: '',
    muscleGroupId: 0,
    weight: 0
  };

  const [values, setValues] = useState<IState>(initialState);

  useEffect(() => {
    muscleGroupsStore!.getMuscleGroups();
  }, []);

  const handleChange = (name: keyof typeof values) => (event: ChangeEvent<HTMLInputElement | { name?: string, value: unknown }>) => {
    setValues({
      ...values,
      [name]: event.target.value
    });
  };

  const handleSelectChange = (e: React.SyntheticEvent<HTMLElement>, data: any) => {
    setValues({
      ...values,
      muscleGroupId: data.value
    })
  };

  const submitForm = () => {
    if (editedExercise) {
      exercisesStore!.updateExercise(values);
    } else {
      exercisesStore!.addExercise(values);
    }
  };

  if (exercisesStore!.isAdded) {
    setValues({
      name: '',
      muscleGroupId: 0,
      weight: 0
    });
    exercisesStore!.clearState();
  }

  if (exercisesStore!.isUpdated) {
    setModalOpen!(false);
    exercisesStore!.clearState();
  }

  return (
    <>
      {muscleGroupsStore!.isLoading ? <Spinner /> :
        <Grid style={styles.mainGrid}>
          <Form style={styles.container}>
            <Form.Field>
              <label>Название</label>
              <input
                type="text"
                placeholder='Введите название упражнения'
                value={values.name}
                onChange={handleChange('name')}
              />
            </Form.Field>
            <Form.Field>
              <label>Группа мышц</label>
              <Select
                value={values.muscleGroupId}
                onChange={handleSelectChange}
                placeholder='Выберите группу мышц'
                options={muscleGroupsStore!.muscleGroups.map((item: IMuscleGroup) => {
                  return {key: item.id, value: item.id, text: item.name}
                })}
              />
            </Form.Field>
            <Form.Field>
              <label>Вес</label>
              <input
                type="number"
                placeholder='Введите вес'
                value={values.weight}
                onChange={handleChange('weight')}
              />
            </Form.Field>
            {exercisesStore!.isLoading ? <Spinner /> :
              <Button
               primary
                style={styles.submitBtn}
                onClick={submitForm}
              >
                {editedExercise ? 'Сохранить' : 'Добавить'}
              </Button>
            }
          </Form>
        </Grid>
      }
    </>

  );
}));

export default ExerciseForm;
