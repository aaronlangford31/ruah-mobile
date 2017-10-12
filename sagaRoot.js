import appSaga from './app/sagas/app';
import userSaga from './app/sagas/user';
import messageSaga from './app/sagas/message';
import productSaga from './app/sagas/product';

const bootstrapSagas = (runSaga) => {
  const sagas = [
    ...appSaga,
    ...userSaga,
    ...messageSaga,
    ...productSaga,
  ];
  return sagas.map(runSaga);
};

export default bootstrapSagas;
