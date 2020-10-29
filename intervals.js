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
    prefInterval: 1,
    interval: 2
  },
  {
    name: 'D',
    position: 3,
    prefInterval: 2,
    interval: 2
  },
  {
    name: 'E',
    position: 5,
    prefInterval: 2,
    interval: 1
  },
  {
    name: 'F',
    position: 6,
    prefInterval: 1,
    interval: 2
  },
  {
    name: 'G',
    position: 8,
    prefInterval: 2,
    interval: 2
  },
  {
    name: 'A',
    position: 10,
    prefInterval: 2,
    interval: 2
  },
  {
    name: 'B',
    position: 12,
    prefInterval: 2,
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

function intervalConstruction(arr) {
  try{
    if(arr.length > 3 || arr.length < 2) {
      throw new Error('Illegal number of elements in input array')
    }

    const [intervalName, note, direction = 'asc'] = arr;
    const noteStart = getNote(note);
    const semitone = getValueByName(note[1]);
    const interval = getInterval(intervalName);

    if(direction === 'dsc') {
      const reversNotes = NOTES.slice().reverse();
      const startIndex = reversNotes.findIndex(item => item === noteStart);
      const newNotes = getNewNotesArr(reversNotes, startIndex);
      const noteEnd = newNotes[interval.degrees - 1];
      const semitoneName = findSemitoneNameDSC(newNotes, interval.semitone, noteEnd.name, semitone);
      const noteEndName = noteEnd.name + semitoneName
      console.log(noteEndName);
      return (noteEndName);
    }

    const startIndex = NOTES.findIndex(item => item === noteStart);
    const newNotes = getNewNotesArr(NOTES, startIndex);
    const noteEnd = newNotes[interval.degrees - 1];
    const semitoneName = findSemitoneNameASC(newNotes, interval.semitone, noteEnd.name, semitone);
    const noteEndName = noteEnd.name + semitoneName;
    console.log(noteEndName);
    return (noteEndName);

   } catch (err) {
     alert(err.message);
   }
}

function intervalIdentification(arr) {
  try{
    if(arr.length > 3 || arr.length < 2) {
      throw new Error('Illegal number of elements in input array')
    }

    const [ start, end, direction = 'asc'] = arr;
    const noteStart = getNote(start);
    const noteEnd = getNote(end);
    const posStart = getValueByName(start[1]) + getValueByName(start[2]);
    const posEnd = getValueByName(end[1]) + getValueByName(end[2]);

    if(direction === 'dsc') {
      const reversNotes = NOTES.slice().reverse();
      const startIndex = reversNotes.findIndex(item => item.name === noteStart.name);
      const newArr = getNewNotesArr(reversNotes, startIndex);
      const degree = findDegree(newArr, noteEnd);
      const interval = findSemitoneIntervalDSC(newArr, noteEnd, posStart, posEnd);
      const intervalName = findNameInterval(degree, interval);
      console.log(intervalName);
      return intervalName;
    }

    const startIndex = NOTES.findIndex(item => item.name === noteStart.name);
    const newArr = getNewNotesArr(NOTES, startIndex);
    const degree = findDegree(newArr, noteEnd);
    const interval = findSemitoneIntervalASC(newArr, noteEnd, posStart, posEnd);
    const intervalName = findNameInterval(degree, interval);
    console.log(intervalName);
    return intervalName;

  } catch (err) {
    alert(err.message);
  }
}

const findNameInterval = (degree, semitone) => {
  const name = INTERVALS.find(item => {
    if(item.degrees === degree && item.semitone === semitone) {return item}
    })
  return name.name;
}

const findSemitoneIntervalASC = (arrNotes, noteEnd, posStart, posEnd) => {
  let passedSemitone = 0; 
  for (let i = 0; i < arrNotes.length; i += 1) {
    if ( arrNotes[i].name === noteEnd.name) {
      break
    };
    passedSemitone += arrNotes[i].interval
  }
  const semitone = passedSemitone + posStart + posEnd;
  if (semitone < 0) {
    return (semitone * (-1))
  }
  return semitone;
}

const findSemitoneIntervalDSC = (arrNotes, noteEnd, posStart, posEnd) => {
  let passedSemitone = 0; 
  for (let i = 0; i < arrNotes.length; i += 1) {
    if ( arrNotes[i].name === noteEnd.name) {
      break
    };
    passedSemitone -= arrNotes[i].prefInterval
  }
  const semitone = posStart -passedSemitone - posEnd;
  if (semitone < 0) {
    return (semitone * (-1))
  }
  return semitone;
}

const findSemitoneNameASC = (arrNotes, degrees, note, semitoneStart) => {
  let passedSemitone = 0; 
  for (let i = 0; i < arrNotes.length; i += 1) {
    if ( arrNotes[i].name === note) {
      break
    };
    passedSemitone += arrNotes[i].interval
  }
  const semitone = degrees - passedSemitone + semitoneStart;
  return getNameByValue(semitone);
}

const findSemitoneNameDSC = (arrNotes, degrees, note, semitoneStart) => {
  let passedSemitone = 0; 
  for (let i = 0; i < arrNotes.length; i += 1) {
    if ( arrNotes[i].name === note) {
      break
    };
    passedSemitone -= arrNotes[i].prefInterval;
  }
  const semitone = semitoneStart - degrees - passedSemitone;
  return getNameByValue(semitone);
}

const getNewNotesArr = (arrNotes, index) => {
  const start = arrNotes.slice(index);
  const finish = arrNotes.slice(0, index);
  const newArr = start.concat(finish);
  return newArr;
}

const getNote = note => {
  return NOTES.find(item => item.name === note[0]);
}

const getNameByValue = value => {
  let symbol = '';
  switch(value) {
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

const getValueByName = value => {
  if(!value) {return 0}
  const semitone = SEMITONE.find(item => item.name === value);
  return semitone.semitone;
}

const findDegree = (arr, end) => {
  const degree = arr.findIndex(item => item === end) + 1;
  return degree;
}

const getInterval = name => {
  const interval = INTERVALS.find(item => item.name === name);
  return interval;
}

// const TEST_DATA_FOR_INTERVAL_CONSTRUCTION = [
//   ['M2', 'C', 'asc'], //D
//   ['P5', 'B', 'asc'], //F#
//   ['m2', 'Bb', 'dsc'], //A
//   ['M3', 'Cb', 'dsc'], //Abb
//   ['P4', 'G#', 'dsc'], //D#
//   ['m3', 'B', 'dsc'], //G#
//   ['m2', 'Fb', 'asc'], //Gbb
//   ['M2', 'E#', 'dsc'], //D#
//   ['P4', 'E', 'dsc'], //B
//   ['m2', 'D#', 'asc'], //E
//   ['M7', 'G', 'asc'], //F#
//   ]

// const answer = TEST_DATA_FOR_INTERVAL_CONSTRUCTION.map( item => intervalConstruction(item));

// const TEST_DATA_FOR_INTERVAL_IDENTIFICATION = [
//   ['C', 'D'], //M2
//   ['B', 'F#', 'asc'], //P5
//   ['Fb', 'Gbb'], //m2
//   ['G', 'F#', 'asc'], //M7
//   ['Bb', 'A', 'dsc'], //m2
//   ['Cb', 'Abb', 'dsc'], //M3
//   ['G#', 'D#', 'dsc'], //P4
//   ['E', 'B', 'dsc'], //P4
//   ['E#', 'D#', 'dsc'], //M2
//   ['B', 'G#', 'dsc'], //m3
// ];

// const answer = TEST_DATA_FOR_INTERVAL_IDENTIFICATION.map( item => intervalIdentification(item));
