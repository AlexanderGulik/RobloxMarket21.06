import Footer from '../components/UI/Footer/Footer.tsx';
import HeaderComponent from '../components/UI/Header/HeaderComponent.tsx';
import CatalogItemList from '../components/CatalogPage/CatalogItemList/CatalogItemList.tsx';
import HeaderCatalog from '../components/CatalogPage/HeaderCatalog.tsx';
import FilterCatalog from '../components/CatalogPage/Filter/FilterCatalog.tsx';
import { filterScheme } from '../const/common';
import useProductFilter from '../hooks/useProductFilter.ts';
import { Helmet } from 'react-helmet';

const CatalogPage = () => {
  const {
    filterState,
    totalPages,
    currentPage,
    onFilterLoading,
    onSearchLoading,
    setFilterState,
    setTotalPages,
    setCurrentPage,
    onFilter,
    onSearch,
    messages,
    handleRemoveMessage,
    handleSetMessage,
  } = useProductFilter(filterScheme);

  return (
    <>
      <Helmet>
        <title>Roblox Market - Каталог товаров</title>
        <meta name="description" content="Каталог товаров Roblox Market - RM Shop. Выгодные цены."></meta>
      </Helmet>
      <HeaderComponent />
      <main>
        <HeaderCatalog />
        <FilterCatalog
          filterState={filterState}
          currentPage={currentPage}
          setFilterState={setFilterState}
          setCurrentPage={setCurrentPage}
          onSearch={onSearch}
          onFilter={onFilter}
        />
        <CatalogItemList
          onFilterLoading={onFilterLoading}
          onSearchLoading={onSearchLoading}
          filterState={filterState}
          setFilterState={setFilterState}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          setTotalPages={setTotalPages}
          totalPages={totalPages}
          messages={messages}
          handleRemoveMessage={handleRemoveMessage}
          handleSetMessage={handleSetMessage}
        />
      </main>
      <Footer />
    </>
  );
};

export default CatalogPage;
