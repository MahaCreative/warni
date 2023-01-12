import React from 'react';
import Cetak from '../../../Layouts/Cetak';

export default function Index() {
    return <div>Index</div>;
}
Index.layout = (page) => <Cetak children={page} />;
