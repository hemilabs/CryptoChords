import { useEffect, useState } from 'react';
import { Presenter } from '../../common/base/Presenter';

// eslint-disable-next-line no-use-before-define
export function usePresenter<P extends Presenter<S>, S>(presenter: P): S {
  const [state, setState] = useState<S>(presenter.state);

  useEffect(() => {
    presenter.subscribe(setState);
  }, [presenter]);

  return state;
}
