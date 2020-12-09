// Store the type index in the upper 128 bits...
uint256 constant TYPE_MASK = uint256(uint128(~0)) << 128;

// ...and the non-fungible index in the lower 128
uint256 constant NF_INDEX_MASK = uint128(~0);

// The top bit is a flag to tell if it is NF
uint256 constant TYPE_NF_BIT = 1 << 255;

function isNonFungible(uint256 _id) public pure returns(bool) {
    return _id & TYPE_NF_BIT == TYPE_NF_BIT;
}
function isFungible(uint256 _id) public pure returns(bool) {
    return _id & TYPE_NF_BIT == 0;
}
function getNonFungibleIndex(uint256 _id) public pure returns(uint256) {
    return _id & NF_INDEX_MASK;
}
function getBaseType(uint256 _id) public pure returns(uint256) {
    return _id & TYPE_MASK;
}
function isType(uint256 _id) public pure returns(bool){
    return (_id & NF_INDEX_MASK == 0);
}