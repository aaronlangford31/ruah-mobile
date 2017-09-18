import appSaga from './app/sagas/app';
import userSaga from './app/sagas/user';
import messageSaga from './app/sagas/message';

const bootstrapSagas = (runSaga) => {
  const sagas = [
    ...appSaga,
    ...userSaga,
    ...messageSaga,
  ];
  return sagas.map(runSaga);
};

export default bootstrapSagas;
