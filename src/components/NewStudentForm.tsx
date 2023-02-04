import React from 'react';
import { GridItem, Tag, Stack, Input, Button } from '@chakra-ui/react';

export function NewStudentForm() {
  return (
    <GridItem w='100%' h='100%' colSpan={1}>
      <div>
        <Tag>Add Student</Tag>
        <Stack spacing={3}>
          <Input
            variant='outline'
            placeholder='Student Name'
            onChange={e => {
              console.log('Updated name,', e.target.value);
            }}
          />
        </Stack>
        <br />
        <Button
          colorScheme='green'
          onClick={() => {
            console.log('Added Student');
          }}>
          Add Student
        </Button>
      </div>
    </GridItem>
  );
}
