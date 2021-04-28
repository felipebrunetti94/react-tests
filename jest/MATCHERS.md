## Matchers

- toBe: usado para igualdade, não vai dar certo com objetos para isso usamos o toEqual

- toEqual: recursivamente checa todos os valores de um objeto

- not: negação

- toBeCloseTo: cuidado com bugs com números esse aqui é mais preciso que toEqual

- toMatch: para checar expressoes regulares

- toContain: para verificar se um array possui algum elemento

- toThrow: para checar erros
  OBS: a função que joga o erro precisa ser chamada por uma outra função.

Para saber mais sobre matcher [referência](https://jestjs.io/docs/using-matchers)
[+++](https://jestjs.io/docs/expect#expectanything)

## Async

### Se você usar callbacks

done => { done()} : jest só termina depois que done() for chamado;
tipo assim:

```
test('the data is peanut butter', done => {
  function callback(data) {
    try {
      expect(data).toBe('peanut butter');
      done();
    } catch (error) {
      done(error);
    }
  }

  fetchData(callback);
});
```

### Se você usar promises

#### Callbacks

```
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```

```
test('the fetch fails with an error', () => {
  expect.assertions(1);
  return fetchData().catch(e => expect(e).toMatch('error'));
});
```

#### Promises

```
test('the data is peanut butter', () => {
  return expect(fetchData()).resolves.toBe('peanut butter');
});
```

```
test('the fetch fails with an error', () => {
  return expect(fetchData()).rejects.toMatch('error');
});
```

#### async / await

```
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
```
