import getAction from '../utilities/actions';
import mockStore from '../utilities/mockStore';
import alertActions from '../../../src/_actions/alert.actions';
import alertConstants from '../../../src/_constants/alert.constants';


describe('Alert Actions', () => {
  describe('Success', () => {
    it('should dispatch alert success message', async () => {
      const store = mockStore();
      store.dispatch(alertActions.success('success message'));

      expect(await getAction(store, alertConstants.SUCCESS)).toEqual({ type: 'ALERT_SUCCESS', message: 'success message' });
    });
  });

  describe('Error', () => {
    it('should dispatch alert error message', async () => {
      const store = mockStore();
      store.dispatch(alertActions.error('error message'));

      expect(await getAction(store, alertConstants.ERROR)).toEqual({ type: 'ALERT_ERROR', message: 'error message' });
    });
  });

  describe('Clear', () => {
    it('should dispatch alert clear message', async () => {
      const store = mockStore();
      store.dispatch(alertActions.clear());

      expect(await getAction(store, alertConstants.CLEAR)).toEqual({ type: 'ALERT_CLEAR' });
    });
  });
});
