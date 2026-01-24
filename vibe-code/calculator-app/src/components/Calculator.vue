<template>
  <div class="calculator">
    <div class="display">{{ displayValue }}</div>
    
    <div class="buttons-grid">
      <button class="btn btn-clear" @click="clear">C</button>
      <button class="btn btn-operator" @click="toggleSign">+/-</button>
      <button class="btn btn-operator" @click="percentage">%</button>
      <button class="btn btn-operator" @click="handleOperator('÷')">÷</button>

      <button class="btn" @click="handleNumber('7')">7</button>
      <button class="btn" @click="handleNumber('8')">8</button>
      <button class="btn" @click="handleNumber('9')">9</button>
      <button class="btn btn-operator" @click="handleOperator('×')">×</button>

      <button class="btn" @click="handleNumber('4')">4</button>
      <button class="btn" @click="handleNumber('5')">5</button>
      <button class="btn" @click="handleNumber('6')">6</button>
      <button class="btn btn-operator" @click="handleOperator('-')">-</button>

      <button class="btn" @click="handleNumber('1')">1</button>
      <button class="btn" @click="handleNumber('2')">2</button>
      <button class="btn" @click="handleNumber('3')">3</button>
      <button class="btn btn-operator" @click="handleOperator('+')">+</button>

      <button class="btn btn-zero" @click="handleNumber('0')">0</button>
      <button class="btn" @click="handleDecimal">.</button>
      <button class="btn btn-equals" @click="calculate">=</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const displayValue = ref<string>('0')
const previousValue = ref<number | null>(null)
const currentOperator = ref<string | null>(null)
const shouldResetDisplay = ref<boolean>(false)

const handleNumber = (num: string): void => {
  if (shouldResetDisplay.value) {
    displayValue.value = num
    shouldResetDisplay.value = false
  } else {
    if (displayValue.value === '0' && num !== '.') {
      displayValue.value = num
    } else {
      displayValue.value += num
    }
  }
}

const handleDecimal = (): void => {
  if (shouldResetDisplay.value) {
    displayValue.value = '0.'
    shouldResetDisplay.value = false
  } else {
    if (!displayValue.value.includes('.')) {
      displayValue.value += '.'
    }
  }
}

const handleOperator = (operator: string): void => {
  const currentNumber = parseFloat(displayValue.value)

  if (previousValue.value === null) {
    previousValue.value = currentNumber
  } else if (currentOperator.value) {
    const result = performCalculation(previousValue.value, currentNumber, currentOperator.value)
    displayValue.value = String(result)
    previousValue.value = result
  }

  currentOperator.value = operator
  shouldResetDisplay.value = true
}

const calculate = (): void => {
  if (currentOperator.value === null || previousValue.value === null) {
    return
  }

  const currentNumber = parseFloat(displayValue.value)
  const result = performCalculation(previousValue.value, currentNumber, currentOperator.value)

  displayValue.value = String(result)
  previousValue.value = null
  currentOperator.value = null
  shouldResetDisplay.value = true
}

const performCalculation = (prev: number, current: number, operator: string): number => {
  switch (operator) {
    case '+':
      return prev + current
    case '-':
      return prev - current
    case '×':
      return prev * current
    case '÷':
      return current !== 0 ? prev / current : 0
    default:
      return current
  }
}

const clear = (): void => {
  displayValue.value = '0'
  previousValue.value = null
  currentOperator.value = null
  shouldResetDisplay.value = false
}

const toggleSign = (): void => {
  const num = parseFloat(displayValue.value)
  displayValue.value = String(num * -1)
}

const percentage = (): void => {
  const num = parseFloat(displayValue.value)
  displayValue.value = String(num / 100)
}
</script>

<style scoped>
.calculator {
  background: #1e1e1e;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 320px;
}

.display {
  background: #333;
  color: #fff;
  font-size: 2.5rem;
  padding: 20px;
  border-radius: 10px;
  text-align: right;
  margin-bottom: 20px;
  word-wrap: break-word;
  word-break: break-all;
  min-height: 60px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.buttons-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.btn {
  padding: 15px;
  font-size: 1.5rem;
  border: none;
  border-radius: 10px;
  background: #444;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
}

.btn:hover {
  background: #555;
  transform: translateY(-2px);
}

.btn:active {
  transform: translateY(0);
}

.btn-operator {
  background: #667eea;
}

.btn-operator:hover {
  background: #5568d3;
}

.btn-clear {
  background: #ff6b6b;
}

.btn-clear:hover {
  background: #ee5a52;
}

.btn-equals {
  background: #51cf66;
  grid-column: span 1;
}

.btn-equals:hover {
  background: #40b946;
}

.btn-zero {
  grid-column: span 2;
}
</style>
