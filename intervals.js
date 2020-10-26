const INTERVALS = {
  m2: {
    semitone: 1,
    degrees: 2
  },
  M2: {
    semitone: 2,
    degrees: 2
  },
  m3: {
    semitone: 3,
    degrees: 3
  },
  M3: {
    semitone: 4,
    degrees: 3
  },
  P4: {
    semitone: 5,
    degrees: 4
  },
  P5: {
    semitone: 7,
    degrees: 5
  },
  m6: {
    semitone: 8,
    degrees: 6
  },
  M6: {
    semitone: 9,
    degrees: 6
  },
  m7: {
    semitone: 10,
    degrees: 7
  },
  M7: {
    semitone: 11,
    degrees: 7
  },
  P8: {
    semitone: 12,
    degrees: 8
  },
};

const NOTES = {
  C: 1,
  D: 3,
  E: 5,
  F: 6,
  G: 8,
  A: 10,
  B: 12,
  b: -1,
  "#": 1,
};

// Test Data
// ['M2', 'C', 'asc']	D
// ['P5', 'B', 'asc']	F#
// ['m2', 'Bb', 'dsc']	A
// ['M3', 'Cb', 'dsc']	Abb
// ['P4', 'G#', 'dsc']	D#
// ['m3', 'B', 'dsc']	G#
// ['m2', 'Fb', 'asc']	Gbb
// ['M2', 'E#', 'dsc']	D#
// ['P4', 'E', 'dsc']	B
// ['m2', 'D#', 'asc']	E
// ['M7', 'G', 'asc']	F#

function intervalConstruction(arr) {
  try{
    if(arr.length > 3 || arr.length < 2) {
      throw new Error('Illegal number of elements in input array')
    }

    const [nameInterval, noteStart, direction = 'asc'] = arr;
    const {semitone, degrees} = INTERVALS[nameInterval];
    const findNotes = () => {
      for (let key in NOTES) {
        if (NOTES[key] === (NOTES[noteStart] + degrees))
        return key;
      }
    };
    console.log(findNotes());

   } catch (err) {
     alert(err.message);
   }
}

intervalConstruction(['M2', 'C', 'asc']);

function intervalIdentification(arr) {
  console.log(arr);
}