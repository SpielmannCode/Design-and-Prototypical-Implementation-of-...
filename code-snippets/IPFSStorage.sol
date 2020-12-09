contract IPFSStorage {
    // METHOD1: store the string as a plain string
    string hash;
    function storeCIDAsString(string memory _hash) public {
        hash = _hash;
    }

    // METHOD2: store the as a struct
    struct Multihash {
        bytes2 hash_function;
        uint8 size;
        bytes32 hash;
    }
    Multihash multihash;
    function storeCIDAsStruct(
        bytes2 _hash_function, 
        uint8 _size, 
        bytes32 _hash
    ) public {
        multihash = Multihash(_hash_function, _size, _hash);
    }

    // METHOD3: store a string in the event log
    event CIDStoredInTheLog(string _hash);
    function storeCIDInTheLog(string memory _hash) public {
        emit CIDStoredInTheLog(_hash);
    }

    // METHOD4: store specific data types in the event log
    event CIDStructStoredInTheLog(
        bytes1 hash_function,
        bytes1 size,
        bytes32 hash
    );
    function storeCIDStructInTheLog(
        bytes1 _hash_function,
        bytes1 _size,
        bytes32 _hash
    ) public {
        emit CIDStructStoredInTheLog(_hash_function, _size, _hash);
    }
}