import React, { useState, Dispatch, SetStateAction } from 'react';
import {
  Button,
  GridItem,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Tag,
  useToast,
} from '@chakra-ui/react';
import { POSSIBLE_COURSES } from '../types/gentrans';
import { Transcript } from '../types/transcript';
import { addGrade } from '../lib/client';

interface INewGrade {
  course: string;
  studentID: string;
  grade: number;
}

export function NewGradeForm({
  transcriptsChanger,
}: {
  transcriptsChanger: Dispatch<SetStateAction<Transcript[]>>;
}) {
  const [newGrade, setNewGrade] = useState<INewGrade>({
    course: '',
    studentID: '',
    grade: 0,
  });
  const toast = useToast();

  const addGradeHandler = async () => {
    await addGrade(parseInt(newGrade.studentID), newGrade.course, newGrade.grade);
    transcriptsChanger((prevValue: Transcript[]) => {
      const newTranscripts = prevValue.map((t: Transcript) => {
        if (t.student.studentID === parseInt(newGrade.studentID)) {
          console.log('found student');
          const gradeAlreadyExists = t.grades.some(g => g.course === newGrade.course);
          if (gradeAlreadyExists) {
            toast({
              title: 'Error adding grade.',
              description: 'Grade already exists for this course.',
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
            return t;
          } else {
            toast({
              title: 'Grade Added.',
              description: "We've created your account for you.",
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
            return {
              ...t,
              grades: t.grades.concat({
                course: newGrade.course,
                grade: newGrade.grade,
              }),
            };
          }
        } else {
          return t;
        }
      });
      return [...newTranscripts];
    });
    setNewGrade({ course: '', studentID: '', grade: 0 });
  };
  return (
    <>
      <GridItem w='100%' h='100%' colSpan={1}>
        <div>
          <Tag>Add Grade</Tag>
          <Stack spacing={6}>
            <Select
              value={newGrade.course}
              placeholder='Select option'
              onChange={option => {
                setNewGrade({ ...newGrade, course: option.target.value });
                // console.log(`Selected option`, option);
              }}>
              {POSSIBLE_COURSES.map(currentCourse => (
                <option value={currentCourse} key={currentCourse}>
                  {currentCourse}
                </option>
              ))}
            </Select>
            <Input
              value={newGrade.studentID}
              variant='outline'
              placeholder='Student ID'
              onChange={e => {
                setNewGrade({ ...newGrade, studentID: e.target.value });
                // console.log(`Added grade!`);
              }}
            />
          </Stack>
        </div>
      </GridItem>
      <GridItem w='100%' h='100%' colSpan={1}>
        <br />
        <Stack spacing={6}>
          <NumberInput
            value={newGrade.grade}
            onChange={value => {
              setNewGrade({ ...newGrade, grade: parseInt(value) });
              // console.log('Changed! New value', value);
            }}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button
            disabled={true}
            colorScheme='green'
            onClick={() => {
              if (newGrade.course !== '' && newGrade.studentID !== '') {
                addGradeHandler();
              } else {
                toast({
                  title: 'Error adding grade.',
                  description: 'Please fill out all fields.',
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                });
              }
            }}>
            Add Grade
          </Button>
        </Stack>
      </GridItem>
    </>
  );
}
