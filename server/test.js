let arr = []
let obj = {}

function createObj(name, phase, gender) {
  let temp = []
  temp.push(name, phase, gender)

  for(let i = 0; i < temp.length; i++) {
    if (!(temp in obj)) {
      obj.name = name,
      obj.phase = phase,
      obj.gender = gender
    }
  }

  arr.push(obj)
}

createObj('akbar', 1, 'male')
createObj('aca', 1, 'female')
console.log(arr);
