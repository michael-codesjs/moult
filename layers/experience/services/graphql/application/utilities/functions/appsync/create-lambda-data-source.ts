type CreateLambdaDataSource = <N extends string>(name: N) => {
  type: "AWS_LAMBDA",
  name: N,
  config: {
    functionName: N
  }
};

export const createLambdaDataSource: CreateLambdaDataSource = <N extends string>(name: N) => ({
  type: "AWS_LAMBDA",
  name,
  config: {
    functionName: name,
  }
})