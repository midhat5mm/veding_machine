describe("POST /user/deposit", () => {

  const baseURL = "http://localhost:3000"


  it("should throw an error when the input is not valid", async () => {
    const response = await request(baseURL).post("/user/deposit").send({
    });

    // TODO: set auth headers

    expect(response.statusCode).toBe(400);
  });

  it("should throw an error when the coins do not match", async () => {
    const response = await request(baseURL).post("/user/deposit").send({
      coins: [111]
    });

    // TODO: set auth headers

    expect(response.statusCode).toBe(406);
  });


  it("should deposit the amount", async () => {
    const response = await request(baseURL).post("/user/buy").send({
      coins: [100, 100]
    });

    // TODO: set auth headers

    expect(response.statusCode).toBe(400);
    // expect user deposit to be updated
    // expect the proper response
  });
});



describe("calculateChange()", () => {
  
});
