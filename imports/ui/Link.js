import React from 'react';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

const Link = () => {
    return (
        <div>
            <PrivateHeader title="Link Component Here" />
            <LinksListFilters />
            <AddLink />
            <LinksList  />
        </div>
    );
}

export default Link;
