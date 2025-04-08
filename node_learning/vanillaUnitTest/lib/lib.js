import { add } from './myLib.js'
import assert from 'assert'

console.log('add() should add two numbers')
try {
    assert.strictEqual(add(1,2), 3)
    console.log("✅ PASSED")
} catch (error) {
    console.log("❌ FAIL")
    console.log(error)
}