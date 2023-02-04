import {
  ChakraProvider,
  Grid,
  GridItem,
  List,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Tag,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import './App.css';
import { NewGradeForm } from './components/NewGradeForm';
import { NewStudentForm } from './components/NewStudentForm';
import { TranscriptView } from './components/TranscriptView';
import { averageGrade, getAllTranscripts } from './lib/client';
import { Transcript } from './types/transcript';

const ITEMS_PER_PAGE = 20;

function App() {
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [pageNumber, setPageNumber] = useState<string>('1');
  const [sortType, setSortType] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<boolean>(true);

  useEffect(() => {
    async function fetchTranscripts() {
      setTranscripts(await getAllTranscripts());
    }
    fetchTranscripts();
  }, []);

  const startIndex = 0 + ITEMS_PER_PAGE * parseInt(pageNumber) - 1;
  const endIndex = ITEMS_PER_PAGE + ITEMS_PER_PAGE * parseInt(pageNumber) - 1;

  const handlePageNumber = (newValue: string) => {
    const parsed: number | undefined = parseInt(newValue);
    if (!parsed || parsed < 1) {
      setPageNumber('');
    } else {
      setPageNumber(newValue);
    }
  };

  useEffect(() => {
    const sortByID = (a: Transcript, b: Transcript, orderType: boolean) => {
      if (a.student.studentID < b.student.studentID) {
        return orderType ? -1 : 1;
      }
      if (a.student.studentID > b.student.studentID) {
        return orderType ? 1 : -1;
      }
      return 0;
    };

    const avgGrade = (a: Transcript): number => {
      return a.grades.reduce((acc, curr) => acc + curr.grade, 0) / a.grades.length;
    };

    const sortByGrade = (a: Transcript, b: Transcript, orderType: boolean) => {
      if (avgGrade(a) < avgGrade(b)) {
        return orderType ? -1 : 1;
      }
      if (avgGrade(a) > avgGrade(b)) {
        return orderType ? 1 : -1;
      }
      return 0;
    };

    const sortByName = (a: Transcript, b: Transcript, orderType: boolean) => {
      if (a.student.studentName < b.student.studentName) {
        return orderType ? -1 : 1;
      }
      if (a.student.studentName > b.student.studentName) {
        return orderType ? 1 : -1;
      }
      return 0;
    };
    switch (sortType) {
      case 'id': {
        const newTranscriptsID = [...transcripts].sort((a, b) => sortByID(a, b, sortOrder));
        setTranscripts(newTranscriptsID);
        break;
      }
      case 'name': {
        const newTranscriptsName = [...transcripts].sort((a, b) => sortByName(a, b, sortOrder));
        setTranscripts(newTranscriptsName);
        break;
      }
      case 'average': {
        const newTranscriptsAverage = [...transcripts].sort((a, b) => sortByGrade(a, b, sortOrder));
        setTranscripts(newTranscriptsAverage);
        break;
      }
      default:
        break;
    }
  }, [sortType, sortOrder, transcripts]);

  const transcriptView = transcripts.slice(startIndex, endIndex).map(eachTranscript => (
    <WrapItem key={eachTranscript.student.studentID}>
      <TranscriptView transcript={eachTranscript} />
    </WrapItem>
  ));

  return (
    <div className='App'>
      <ChakraProvider>
        <Grid templateColumns='repeat(5, 1fr)' gap={6}>
          <GridItem w='100%' h='100%' colSpan={2}>
            <div>
              <Tag>Sort by</Tag>
              <br />
              <Select
                placeholder='Select a sort order'
                onChange={option => {
                  setSortType(option.target.value);
                  console.log(`Selected sort order ${option.target.value}`);
                }}>
                <option value='id'>Student ID</option>
                <option value='name'>Student name</option>
                <option value='average'>Average Grade</option>
              </Select>
              <br />
              <Select
                onChange={option => {
                  setSortOrder(option.target.value === 'asc' ? true : false);
                  console.log(`Selected sort order ${option.target.value}`);
                }}>
                <option value='asc'>Ascending</option>
                <option value='desc'>Descending</option>
              </Select>
            </div>
          </GridItem>
          <NewStudentForm />
          <NewGradeForm />
        </Grid>
        <br />
        <Tag>Page #</Tag>
        <NumberInput value={pageNumber} onChange={value => handlePageNumber(value)} min={1}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <br />
        <Wrap>
          <List spacing={6}>{transcriptView}</List>
        </Wrap>
      </ChakraProvider>
    </div>
  );
}

export default App;
