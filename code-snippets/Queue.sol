struct Queue{
    uint256 head;
    uint256 tail;
    mapping(uint256 => QueuedUser) queue;
    uint256 numberTickets;
}

struct QueuedUser{
    address payable userAddress;
    uint256 quantity;
}