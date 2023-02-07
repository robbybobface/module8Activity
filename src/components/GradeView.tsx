import React, { Dispatch, SetStateAction } from 'react';
import {
  Stat,
  StatLabel,
  StatNumber,
  Editable,
  EditablePreview,
  EditableInput,
  useToast,
} from '@chakra-ui/react';
import { CourseGrade, Transcript } from '../types/transcript';

export function GradeView({
  grade,
  student,
  stateChanger,
}: {
  grade: CourseGrade;
  student: { studentName: string; studentID: number };
  stateChanger: Dispatch<SetStateAction<Transcript[]>>;
}) {
  const toast = useToast();
  return (
    <Stat>
      <StatLabel>{grade.course}</StatLabel>
      <StatNumber>
        <Editable
          defaultValue={`${grade.grade}`}
          onSubmit={newValue => {
            // try {
            // updateTranscripts(student.studentID, grade.course, parseInt(newValue));
            stateChanger((prevValue: Transcript[]) => {
              const newTranscripts = prevValue.map((t: Transcript) => {
                if (t.student.studentID === student.studentID) {
                  console.log('found student');
                  return {
                    ...t,
                    grades: t.grades.map(g => {
                      if (g.course === grade.course) {
                        return { course: g.course, grade: parseInt(newValue) };
                      } else {
                        return g;
                      }
                    }),
                  };
                } else {
                  return t;
                }
              });
              return [...newTranscripts];
            });
            // } catch (e) {
            //   console.log(e);
            // }
            toast({
              title: 'Grade Updated.',
              description: "We've changed the grade for this student.",
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
            console.log(`Want to update grade to ${newValue}`);
          }}>
          <EditablePreview />
          <EditableInput />
        </Editable>
      </StatNumber>
    </Stat>
  );
}
