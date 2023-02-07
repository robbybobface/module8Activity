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
import { updateTranscripts } from '../lib/client';

export function GradeView({
  grade,
  student,
  transcriptsChanger,
}: {
  grade: CourseGrade;
  student: { studentName: string; studentID: number };
  transcriptsChanger: Dispatch<SetStateAction<Transcript[]>>;
}) {
  const toast = useToast();
  return (
    <Stat>
      <StatLabel>{grade.course}</StatLabel>
      <StatNumber>
        <Editable
          defaultValue={`${grade.grade}`}
          onSubmit={async newValue => {
            // try {
            // I tried creating a new endpoint for updating a single grade, but it didn't work.
            // PUT requests to /api/transcripts/:studentID/:course/:grade didn't work.
            // returns 404
            // await updateTranscripts(student.studentID, grade.course, parseInt(newValue));
            console.log(
              `Updating transcript for student ${student.studentID} in course ${grade.course} to ${newValue}`,
            );
            transcriptsChanger((prevValue: Transcript[]) => {
              const newTranscripts = prevValue.map((t: Transcript) => {
                if (t.student.studentID === student.studentID) {
                  // console.log('found student');
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
            // console.log(`Want to update grade to ${newValue}`);
          }}>
          <EditablePreview />
          <EditableInput />
        </Editable>
      </StatNumber>
    </Stat>
  );
}
