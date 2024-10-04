export type VerifyAuthChallengeUseCaseParams = { challenge: string, challengeAnswer: string };
export type VerifyAuthChallengeUseCase = (params: VerifyAuthChallengeUseCaseParams) => boolean;

export const verifyAuthChallenge: VerifyAuthChallengeUseCase = (params) => params.challenge === params.challengeAnswer;