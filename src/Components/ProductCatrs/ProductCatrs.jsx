import PropTypes from 'prop-types';


const ProductCatrs = ({ items }) => {

    console.log(items);

    return (
        <div>

        </div>
    );
};

export default ProductCatrs;

ProductCatrs.propTypes = {
    items: PropTypes.object.isRequired
}