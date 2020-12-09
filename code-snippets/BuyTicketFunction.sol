function mintFungible(uint256 _type, uint256 _quantity, address[] memory _affiliates)
    public
    payable
    //...
{
    _mintFungible(_type, _quantity);

    //calculate payments
    uint256 totalPrice = ticketTypeMeta[_type].price.mul(_quantity);
    uint256 affiliatesReward = totalPrice.mul(affiliatesPercentage).div(100);
    uint256 cutPerAffiliate = affiliatesReward.div(_affiliates.length + 1); //plus 1 for identity approver

    //pay owner
    transferValue(msg.sender, owner, totalPrice.sub(affiliatesReward));

    //pay affiliates
    for(uint256 i = 0; i<_affiliates.length; i++){
        transferValue(msg.sender, _affiliates[i], cutPerAffiliate);
    }

    //pay identity approver
    transferValue(msg.sender, identityApprover, cutPerAffiliate);

    emit MintFungibles(msg.sender, _type, _quantity);
}