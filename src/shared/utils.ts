import { saveAs } from 'file-saver';
import XLSX from 'xlsx';

import { IExercise } from '../models/exercise.interface';
import { IMuscleGroup } from '../models/muscle-group.interface';
import { IWeekSchedule } from '../models/week-schedule.interface';

export const getRandomSchedule = (exercises: IExercise[], muscleGroups: IMuscleGroup[]): IWeekSchedule => {
  const weekSchedule: IWeekSchedule = {
    firstDay: {
      mainRound: [],
      additionalRound: []
    },
    secondDay: {
      mainRound: [],
      additionalRound: []
    },
    thirdDay: {
      mainRound: [],
      additionalRound: []
    },
  };

  let mainExercises: IExercise[] = exercises.filter((e: IExercise) => e.isMain);
  let additionalExercises: IExercise[] = exercises.filter((e: IExercise) => !e.isMain);

  muscleGroups.forEach((item) => {
    const mainFilteredExercises = getExercisesFilteredByGroupId(mainExercises, item.id);
    const randomMainExercise = getRandomExercise(mainFilteredExercises);
    mainExercises = mainExercises.filter((item: IExercise) => item.id !== randomMainExercise.id);
    weekSchedule.firstDay.mainRound.push(randomMainExercise.name);

    const addFilteredExercises = getExercisesFilteredByGroupId(additionalExercises, item.id);
    const randomAddExercise = getRandomExercise(addFilteredExercises);
    additionalExercises = additionalExercises.filter((item: IExercise) => item.id !== randomAddExercise.id);
    weekSchedule.firstDay.additionalRound.push(randomAddExercise.name);
  });

  muscleGroups.forEach((item) => {
    const mainFilteredExercises = getExercisesFilteredByGroupId(mainExercises, item.id);
    const randomMainExercise = getRandomExercise(mainFilteredExercises);
    mainExercises = mainExercises.filter((item: IExercise) => item.id !== randomMainExercise.id);
    weekSchedule.secondDay.mainRound.push(randomMainExercise.name);

    const addFilteredExercises = getExercisesFilteredByGroupId(additionalExercises, item.id);
    const randomAddExercise = getRandomExercise(addFilteredExercises);
    additionalExercises = additionalExercises.filter((item: IExercise) => item.id !== randomAddExercise.id);
    weekSchedule.secondDay.additionalRound.push(randomAddExercise.name);
  });

  muscleGroups.forEach((item) => {
    const mainFilteredExercises = getExercisesFilteredByGroupId(mainExercises, item.id);
    const randomMainExercise = getRandomExercise(mainFilteredExercises);
    mainExercises = mainExercises.filter((item: IExercise) => item.id !== randomMainExercise.id);
    weekSchedule.thirdDay.mainRound.push(randomMainExercise.name);

    const addFilteredExercises = getExercisesFilteredByGroupId(additionalExercises, item.id);
    const randomAddExercise = getRandomExercise(addFilteredExercises);
    additionalExercises = additionalExercises.filter((item: IExercise) => item.id !== randomAddExercise.id);
    weekSchedule.thirdDay.additionalRound.push(randomAddExercise.name);
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
    ['Основные', 'Основные', 'Основные'],
  ];

  for (let i = 0; i < schedule.firstDay.mainRound.length; i++) {
    resultArray.push([
      schedule.firstDay.mainRound[i],
      schedule.secondDay.mainRound[i],
      schedule.thirdDay.mainRound[i],
    ])
  }

  resultArray.push(['Вспомогательные', 'Вспомогательные', 'Вспомогательные']);

  for (let i = 0; i < schedule.firstDay.additionalRound.length; i++) {
    resultArray.push([
      schedule.firstDay.additionalRound[i],
      schedule.secondDay.additionalRound[i],
      schedule.thirdDay.additionalRound[i],
    ])
  }

  return resultArray;
};
