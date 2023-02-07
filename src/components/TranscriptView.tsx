import React, { Dispatch, SetStateAction } from 'react';
import { ListItem, HStack, Tag, Badge } from '@chakra-ui/react';
import { Transcript } from '../types/transcript';
import { GradeView } from './GradeView';

export function TranscriptView({
  transcript,
  stateChanger,
}: {
  transcript: Transcript;
  stateChanger: Dispatch<SetStateAction<Transcript[]>>;
}) {
  return (
    <ListItem>
      <HStack spacing='12px'>
        <Tag>{transcript.student.studentName}</Tag>
        <Badge variant='outline' colorScheme='green'>
          #{transcript.student.studentID}
        </Badge>

        {transcript.grades.map((eachGrade, eachGradeIndex) => (
          <GradeView
            key={eachGradeIndex}
            grade={eachGrade}
            student={transcript.student}
            stateChanger={stateChanger}
          />
        ))}
      </HStack>
    </ListItem>
  );
}
