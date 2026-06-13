# MLP Formulas and equations

- 4 inputs  
- 2 hidden neurons (ReLU)  
- 2 output neurons (softmax)  
- Cross‑entropy gradient  
- Full backprop  

---

## ⭐ 1. Hidden layer pre‑activation  

For each hidden neuron \( h_i \):

\[
z^{(h)}_i = \sum_{j=1}^{4} W^{(ih)}_{ij} \, x_j + b^{(h)}_i
\]

In code:

```js
weightsInputHidden[i][j] * inputs[j] + biasesHidden[i]
```

---

## 2. Hidden layer activation (ReLU)

\[
a^{(h)}_i = \max(0, z^{(h)}_i)
\]

In code:

```js
Math.max(0, z)
```

Derivative:

\[
\text{ReLU}'(z) =
\begin{cases}
1 & z > 0 \\
0 & z \le 0
\end{cases}
\]

---

## 3. Output layer pre‑activation

For each output neuron \( o_k \):

\[
z^{(o)}_k = \sum_{i=1}^{2} W^{(ho)}_{ki} \, a^{(h)}_i + b^{(o)}_k
\]

In code:

```js
weightsHiddenOutput[i][j] * hiddenActivations[j] + biasesOutput[i]
```

---

## 4. Softmax output probabilities

\[
\hat{y}_k = \frac{e^{z^{(o)}_k}}{\sum_{m} e^{z^{(o)}_m}}
\]

The code uses the numerically stable version:

```js
exp(output - maxOutput) / sumExpValues
```

---

## 5. Output layer deltas

Because we’re using **softmax + cross‑entropy**, the gradient simplifies beautifully:

\[
\delta^{(o)}_k = \hat{y}_k - y_k
\]

In code:

```js
probability - targets[i]
```

---

## 6. Hidden layer deltas  

Chain rule:

\[
\delta^{(h)}_i =
\left( \sum_{k=1}^{2} \delta^{(o)}_k \, W^{(ho)}_{k i} \right)
\cdot \text{ReLU}'(z^{(h)}_i)
\]

In code:

```js
sum + delta * weightsHiddenOutput[j][i]
```

Then multiplied by:

```js
this.reluDerivate(z)
```

---

## 7. Weight update rules  

Learning rate: \( \eta = 0.01 \)

### Output layer weights

\[
W^{(ho)}_{ki} \leftarrow
W^{(ho)}_{ki}
- \eta \, \delta^{(o)}_k \, a^{(h)}_i
\]

### Output biases

\[
b^{(o)}_k \leftarrow b^{(o)}_k - \eta \, \delta^{(o)}_k
\]

---

### Hidden layer weights

\[
W^{(ih)}_{ij} \leftarrow
W^{(ih)}_{ij}

- \eta \, \delta^{(h)}_i \, x_j
\]

### Hidden biases

\[
b^{(h)}_i \leftarrow b^{(h)}_i - \eta \, \delta^{(h)}_i
\]

---

## 8. Summary table

| Stage | Formula |
| ------ | --------- |
| Hidden sum | \( z^{(h)}_i = \sum_j W^{(ih)}_{ij} x_j + b^{(h)}_i \) |
| Hidden activation | \( a^{(h)}_i = \max(0, z^{(h)}_i) \) |
| Output sum | \( z^{(o)}_k = \sum_i W^{(ho)}_{ki} a^{(h)}_i + b^{(o)}_k \) |
| Softmax | \( \hat{y}_k = \frac{e^{z_k}}{\sum_m e^{z_m}} \) |
| Output delta | \( \delta^{(o)}_k = \hat{y}_k - y_k \) |
| Hidden delta | \( \delta^{(h)}_i = (\sum_k \delta^{(o)}_k W_{ki}) \cdot \text{ReLU}'(z_i) \) |
| Weight update | \( W \leftarrow W - \eta \delta \cdot \text{input} \) |
| Bias update | \( b \leftarrow b - \eta \delta \) |
