const scores = [
  { roundId: 1, holeNumber: 1, par: 3, score: 4 },
  { roundId: 1, holeNumber: 2, par: 3, score: 4 },
  { roundId: 1, holeNumber: 3, par: 3, score: 4 },
  { roundId: 1, holeNumber: 4, par: 3, score: 4 },
  { roundId: 1, holeNumber: 5, par: 3, score: 4 },
  { roundId: 1, holeNumber: 6, par: 3, score: 4 },
  { roundId: 1, holeNumber: 7, par: 3, score: 4 },
  { roundId: 1, holeNumber: 8, par: 3, score: 4 },
  { roundId: 1, holeNumber: 9, par: 3, score: 4 }
]

let numberedVariables = '';

for (let i = 0; i < scores.length; i++) {
  if (i === (scores.length - 1)) {
    numberedVariables += `$${i + 1}`
  }
  else {
  numberedVariables += `$${i + 1}, `
  }
}

const valueVariables = `(${numberedVariables})`;

const sql = `
insert into "scores" ("roundId", "holeNumber", "par", "score")
values ${valueVariables}
`
