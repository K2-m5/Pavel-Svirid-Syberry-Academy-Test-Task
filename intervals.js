const INTERVALS = [
  {
    name: 'm2',
    semitone: 1,
    degrees: 2
  },
  {
    name: 'M2',
    semitone: 2,
    degrees: 2
  },
  {
    name: 'm3',
    semitone: 3,
    degrees: 3
  },
  {
    name: 'M3',
    semitone: 4,
    degrees: 3
  },
  {
    name: 'P4',
    semitone: 5,
    degrees: 4
  },
  {
    name: 'P5',
    semitone: 7,
    degrees: 5
  },
  {
    name: 'm6',
    semitone: 8,
    degrees: 6
  },
  {
    name: 'M6',
    semitone: 9,
    degrees: 6
  },
  {
    name: 'm7',
    semitone: 10,
    degrees: 7
  },
  {
    name: 'M7',
    semitone: 11,
    degrees: 7
  },
  {
    name: 'P8',
    semitone: 12,
    degrees: 8
  },
];

const NOTES = [
  {
    name: 'C',
    position: 1,
    interval: 2
  },
  {
    name: 'D',
    position: 3,
    interval: 2
  },
  {
    name: 'E',
    position: 5,
    interval: 1
  },
  {
    name: 'F',
    position: 6,
    interval: 2
  },
  {
    name: 'G',
    position: 8,
    interval: 2
  },
  {
    name: 'A',
    position: 10,
    interval: 2
  },
  {
    name: 'B',
    position: 12,
    interval: 1
  }
]

const SEMITONE = [
  {
    name: '#',
    semitone: 1
  },
  {
    name: 'b',
    semitone: -1
  }
]

const getNoteFinish = (noteStart, interval, semitoneStart) => {
  const startIndex = NOTES.findIndex(item => item === noteStart);
  const steps = isLetStart(startIndex, interval);
  const firstStep = 1;
  const findNote = NOTES[steps - firstStep].name;
  const semitone = findSemitone(startIndex, interval.semitone, findNote, semitoneStart);
  return findNote + semitone;
}

const findSemitone = (startIndex, interval, note, semitoneStart) => {
  const newNotes = getNewNotesArr(startIndex);
  let passedSemitone = 0; 
  for (let i = 0; i < newNotes.length; i += 1) {
    if ( newNotes[i].name === note) {
      break
    };
    passedSemitone += newNotes[i].interval;
  }
  const semitone = interval - passedSemitone + semitoneStart;
  return getSemitone(semitone);
}

const getNewNotesArr = (index) => {
  const startArr = NOTES.slice(index);
  const finish = NOTES.slice(0, index);
  const newArr = startArr.concat(finish);
  return newArr;
}

const passedInterval = (pos, semitone,) => {

}

const isLetStart = (startIndex, interval) => {
  const position = startIndex + interval.degrees;
  if( position >= NOTES.length ) {
    return position - NOTES.length;
  }
  return position;
}

const getNoteStart = note => {
  return NOTES.find(item => item.name === note[0]);
}

const getSemitone = index => {
  let symbol = '';
  switch(index) {
    case -1:
      symbol = 'b';
      break;
    case -2:
      symbol = 'bb';
      break;
    case 1:
      symbol = '#'
      break;
    case 2:
      symbol = '#'
      break;
  }
  return symbol;
}

const getPosition = (position, semitone = 0) => {
  return (position + semitone);
};

const getInterval = name => {
  const interval = INTERVALS.find(item => item.name === name);
  return interval;
}

function intervalConstruction(arr) {
  try{
    if(arr.length > 3 || arr.length < 2) {
      throw new Error('Illegal number of elements in input array')
    }

    const [intervalName, note, direction = 'asc'] = arr;

    switch (direction) {

      case 'asc':
        const noteStart = getNoteStart(note);
    
        const semitone = (note.length > 1) ?
          SEMITONE.find(item => item.name === note[1]).semitone
          : 0;
        // const positionStart = getPosition(noteStart.position, semitone.semitone);
        // console.log(positionStart);
    
        const interval = getInterval(intervalName);
    
        const noteFinish = getNoteFinish(noteStart, interval, semitone);
        console.log(noteFinish);

        break;

      case 'dsc':
        console.log('Hi');
    }
   } catch (err) {
     alert(err.message);
   }
}

const TEST_DATA = [
['M2', 'C', 'asc'],	//D
['P5', 'B', 'asc'],	//F#
// ['m2', 'Bb', 'dsc'], //A
// ['M3', 'Cb', 'dsc'],	//Abb
// ['P4', 'G#', 'dsc'], //D#
// ['m3', 'B', 'dsc'], //G#
['m2', 'Fb', 'asc'], //Gbb
// ['M2', 'E#', 'dsc'], //D#
// ['P4', 'E', 'dsc'], //B
['m2', 'D#', 'asc'], //E
['M7', 'G', 'asc'], //F#
]
const answer = TEST_DATA.map( item => intervalConstruction(item));

function intervalIdentification(arr) {
  console.log(arr);
}