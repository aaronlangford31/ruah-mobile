import appSaga from './app/sagas/app';
import userSaga from './app/sagas/user';

const bootstrapSagas = (runSaga) => {
  const sagas = [
    ...appSaga,
    ...userSaga,
  ];
  return sagas.map(runSaga);
};

export default bootstrapSagas;
