import React, { Dispatch, SetStateAction } from 'react';
import { GridItem, Tag, Stack, Input, Button, useToast } from '@chakra-ui/react';
import { Transcript } from '../types/transcript';

export function NewStudentForm({
  stateChanger,
}: {
  stateChanger: Dispatch<SetStateAction<Transcript[]>>;
}) {
  const [name, setName] = React.useState('');
  const toast = useToast();
  const sortByID = (a: Transcript, b: Transcript, orderType: boolean) => {
    if (a.student.studentID < b.student.studentID) {
      return orderType ? -1 : 1;
    }
    if (a.student.studentID > b.student.studentID) {
      return orderType ? 1 : -1;
    }
    return 0;
  };
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
          onClick={() => {
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
              stateChanger((prevValue: Transcript[]) => {
                const lastIndex = [...prevValue].sort((a, b) => sortByID(a, b, true)).slice(-1)[0]
                  .student.studentID;
                // console.log(lastIndex);
                const newTranscripts = [
                  ...prevValue,
                  { student: { studentName: name, studentID: lastIndex + 1 }, grades: [] },
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
