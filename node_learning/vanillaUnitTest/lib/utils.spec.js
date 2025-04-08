const { getNewUser, mapObjectToArray} = require('./utils.js'); 

describe('mapObjectToArray()', ()=>{
    test('maps values to array using callback', ()=>{
        const result = mapObjectToArray({ age: 30, height: 65 }, (k, v) => {
            return v + 10
        })

        expect(result).toEqual([40, 75])
    })
})