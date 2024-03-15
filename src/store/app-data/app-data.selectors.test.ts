import { NameSpace } from '../../const';
import { getOffers } from '../../store/app-data/app-data.selectors';
import { TOffers } from '../../types/offer';
import { TState } from '../../types/state';
import { makeFakeOffer } from '../../utils/mocks';

describe('getOffers', () => {
  it('test_getOffers_returnsOffers', () => {
    const mockOffer = makeFakeOffer();
    const mockOffers = Array.from({ length: 3 }, () => mockOffer);
    const mockState = {
      [NameSpace.Data]: {
        offers: mockOffers,
      },
    };

    const result = getOffers(mockState as Pick<TState, NameSpace.Data>);
    expect(result).toEqual(mockState[NameSpace.Data].offers);
  });

  it('test_getOffers_returnsEmptyArrayWhenNoOffers', () => {
    const mockState = {
      [NameSpace.Data]: {
        offers: [] as TOffers,
      },
    };

    const result = getOffers(mockState as Pick<TState, NameSpace.Data>);
    expect(result).toEqual(mockState[NameSpace.Data].offers);
  });
});
