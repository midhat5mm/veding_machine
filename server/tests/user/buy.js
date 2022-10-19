describe("POST /user/buy", () => {

    const baseURL = "http://localhost:3000"


    it("should throw an error when the input is not valid", async () => {
      const response = await request(baseURL).post("/user/buy").send({
        productId: "1",
      });

      // TODO: set auth headers

      expect(response.statusCode).toBe(400);
    });

    it("should throw an error when product does not have the proper amount", async () => {
      const response = await request(baseURL).post("/user/buy").send({
        productId: "1",
        amount: 1
      });

      // TODO: set auth headers

      expect(response.statusCode).toBe(406);
    });


    it("should throw an error when the user despoit is not enough", async () => {
      const response = await request(baseURL).post("/user/buy").send({
        productId: "1",
        amount: 1
      });

      // TODO: set auth headers

      expect(response.statusCode).toBe(406);
    });


    it("should buy the product", async () => {
      const response = await request(baseURL).post("/user/buy").send({
        productId: "1",
      });

      // TODO: set auth headers

      expect(response.statusCode).toBe(200);
      // expect produt to be updated
      // expect user to be updated
      // expect the proper response
    });
  });



  describe("calculateChange()", () => {
    
  });
