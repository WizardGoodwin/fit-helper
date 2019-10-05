import { saveAs } from 'file-saver';
import XLSX from 'xlsx';

import { IExercise } from '../models/exercise.interface';
import { IMuscleGroup } from '../models/muscle-group.interface';
import { IWeekSchedule } from '../models/week-schedule.interface';

export const getRandomSchedule = (exercises: IExercise[], muscleGroups: IMuscleGroup[]): IWeekSchedule => {
  const weekSchedule: IWeekSchedule = {
    firstDay: [],
    secondDay: [],
    thirdDay: []
  };

  let _exercises: IExercise[] = exercises;

  muscleGroups.forEach((item) => {
    const filteredExercises = getExercisesFilteredByGroupId(_exercises, item.id);
    const randomExercise = getRandomExercise(filteredExercises);
    _exercises = _exercises.filter((item: IExercise) => item.id !== randomExercise.id);
    weekSchedule.firstDay.push(randomExercise.name);
  });

  muscleGroups.forEach((item) => {
    const filteredExercises = getExercisesFilteredByGroupId(_exercises, item.id);
    const randomExercise = getRandomExercise(filteredExercises);
    _exercises = _exercises.filter((item: IExercise) => item.id !== randomExercise.id);
    weekSchedule.secondDay.push(randomExercise.name);
  });

  muscleGroups.forEach((item) => {
    const filteredExercises = getExercisesFilteredByGroupId(_exercises, item.id);
    const randomExercise = getRandomExercise(filteredExercises);
    _exercises = _exercises.filter((item: IExercise) => item.id !== randomExercise.id);
    weekSchedule.thirdDay.push(randomExercise.name);
  });

  return weekSchedule;
};

export const exportData = (data: IWeekSchedule) => {
  const saveFile = (s: string) => {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  const newBook = XLSX.utils.book_new();
  const workSheet = XLSX.utils.json_to_sheet(convertScheduleToArray(data));

  const workBook = {
    ...newBook,
    Props: {
      Author: 'Maxim Patrushev',
      CreatedDate: new Date(),
      Subject: 'Fit helper schedule',
      Title: 'Fit helper schedule',
    },
    SheetNames: [...newBook.SheetNames, 'Fit helper schedule'],
    Sheets: {
      ...newBook.Sheets,
      'Fit helper schedule': workSheet,
    },
  };

  const NOW = new Date();
  saveAs(
    new Blob(
      [
        saveFile(
          XLSX.write(workBook, {
            bookType: 'xlsx',
            type: 'binary',
          }),
        ),
      ],
      {
        type: 'application/octet-stream',
      },
    ),
    `Fit helper schedule -${NOW.toUTCString()}.xlsx`,
  );
};


const getRandomExercise = (exercises: IExercise[]): IExercise => {
  const exercisesCount = exercises.length;
  const randomNumber = Math.floor(Math.random() * (exercisesCount));
  return exercises[randomNumber];
};

const getExercisesFilteredByGroupId = (exercises: IExercise[], groupId: number): IExercise[] => {
  return exercises.filter((item: IExercise) => item.muscleGroupId === groupId);
};

const convertScheduleToArray = (schedule: IWeekSchedule): any[] => {
  const resultArray = [
    ['Понедельник', 'Среда', 'Пятница'],
  ];
  for (let i = 0; i < schedule.firstDay.length; i++) {
    resultArray.push([
      schedule.firstDay[i],
      schedule.secondDay[i],
      schedule.thirdDay[i],
    ])
  }

  return resultArray;
};
