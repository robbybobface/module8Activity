import React, { Dispatch, SetStateAction } from 'react';
import { GridItem, Tag, Stack, Input, Button, useToast } from '@chakra-ui/react';
import { Transcript } from '../types/transcript';
import { addStudent } from '../lib/client';

export function NewStudentForm({
  stateChanger,
}: {
  stateChanger: Dispatch<SetStateAction<Transcript[]>>;
}) {
  const [name, setName] = React.useState('');
  const toast = useToast();
  return (
    <GridItem w='100%' h='100%' colSpan={1}>
      <div>
        <Tag>Add Student</Tag>
        <Stack spacing={3}>
          <Input
            variant='outline'
            placeholder='Student Name'
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
          />
        </Stack>
        <br />
        <Button
          colorScheme='green'
          onClick={async () => {
            if (name === '') {
              toast({
                title: 'No name entered.',
                description: 'Please enter a name.',
                status: 'error',
                duration: 5000,
                isClosable: true,
              });
              return;
            } else {
              const newStudentID = await addStudent(name);
              stateChanger((prevValue: Transcript[]) => {
                const newTranscripts = [
                  ...prevValue,
                  { student: { studentName: name, studentID: newStudentID }, grades: [] },
                ];
                return [...newTranscripts];
              });
              setName('');
              toast({
                title: 'Student Added.',
                description: "We've added this student.",
                status: 'success',
                duration: 5000,
                isClosable: true,
              });
            }
          }}>
          Add Student
        </Button>
      </div>
    </GridItem>
  );
}
