import { useState } from 'react';
import Card from '../card/card';
import { OfferWithComments } from '../../types/offerWithComments';

type OffersListProps = {
  data: OfferWithComments[];
};

function OffersList({ data }: OffersListProps): JSX.Element {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleCardMouseEnter = (id: string) => {
    setActiveCardId(id);
  };

  const handleCardMouseLeave = () => {
    setActiveCardId(null);
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {data.map(({ offer }) => (
        <Card
          key={offer.id}
          offer={offer}
          isActive={activeCardId === offer.id}
          onMouseEnter={() => handleCardMouseEnter(offer.id)}
          onMouseLeave={handleCardMouseLeave}
        />
      ))}
    </div>
  );
}

export default OffersList;
