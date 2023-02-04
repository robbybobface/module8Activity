import React from 'react';
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
  Toast,
  useToast,
} from '@chakra-ui/react';
import { POSSIBLE_COURSES } from '../types/gentrans';

export function NewGradeForm() {
  const toast = useToast();
  return (
    <>
      <GridItem w='100%' h='100%' colSpan={1}>
        <div>
          <Tag>Add Grade</Tag>
          <Stack spacing={6}>
            <Select
              placeholder='Select option'
              onChange={option => {
                console.log(`Selected option`, option);
              }}>
              {POSSIBLE_COURSES.map(currentCourse => (
                <option value={currentCourse} key={currentCourse}>
                  {currentCourse}
                </option>
              ))}
            </Select>
            <Input
              variant='outline'
              placeholder='Student ID'
              onChange={() => {
                console.log(`Added grade!`);
              }}
            />
          </Stack>
        </div>
      </GridItem>
      <GridItem w='100%' h='100%' colSpan={1}>
        <br />
        <Stack spacing={6}>
          <NumberInput
            onChange={value => {
              console.log('Changed! New value', value);
            }}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button
            colorScheme='green'
            onClick={() => {
              toast({
                title: 'Grade Added.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
              });
              console.log('Add Toast Here!');
            }}>
            Add Grade
          </Button>
        </Stack>
      </GridItem>
    </>
  );
}
