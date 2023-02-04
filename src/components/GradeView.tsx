import React from 'react';
import {
  Stat,
  StatLabel,
  StatNumber,
  Editable,
  EditablePreview,
  EditableInput,
} from '@chakra-ui/react';
import { CourseGrade } from '../types/transcript';
import { updateTranscripts } from '../types/local-transcript-manager';

export function GradeView({
  grade,
  student,
}: {
  grade: CourseGrade;
  student: { studentName: string; studentID: number };
}) {
  return (
    <Stat>
      <StatLabel>{grade.course}</StatLabel>
      <StatNumber>
        <Editable
          defaultValue={`${grade.grade}`}
          onSubmit={newValue => {
            try {
              updateTranscripts(student.studentID, grade.course, parseInt(newValue));
            } catch (e) {
              console.log(e);
            }

            console.log(`Want to update grade to ${newValue}`);
          }}>
          <EditablePreview />
          <EditableInput />
        </Editable>
      </StatNumber>
    </Stat>
  );
}
