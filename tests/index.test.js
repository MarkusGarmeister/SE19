


beforeAll(() => {
  console.log("Ich bin hier")
})

afterAll(() => {
  console.log("Jetzt bin ich auch hier")
})

test('city database has Vienna', () => {
  console.log("Jetzt bin ich bier")
    expect(true).toBeTruthy();
  });

