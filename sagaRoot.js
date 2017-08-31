import appSaga from './app/sagas/app';

const bootstrapSagas = (runSaga) => {
  const sagas = [
    //...appSaga,
  ];
  return sagas.map(runSaga);
};

export default bootstrapSagas;
