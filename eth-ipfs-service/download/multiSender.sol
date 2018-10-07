pragma solidity ^0.4.24;

library SafeMath {

  /**
   * @dev Multiplies two numbers, throws on overflow.
   */
  function mul(uint256 a, uint256 b) internal pure returns (uint256 c) {
    if (a == 0) {
      return 0;
    }
    c = a * b;
    assert(c / a == b);
    return c;
  }

  /**
   * @dev Integer division of two numbers, truncating the quotient.
   */
  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    // assert(b > 0); // Solidity automatically throws when dividing by 0
    // uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
    return a / b;
  }

  /**
   * @dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
   */
  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  /**
   * @dev Adds two numbers, throws on overflow.
   */
  function add(uint256 a, uint256 b) internal pure returns (uint256 c) {
    c = a + b;
    assert(c >= a);
    return c;
  }
}

contract ERC20Basic {
  uint public totalSupply;
  function balanceOf(address who) public constant returns (uint);
  function transfer(address to, uint value) public;
  event Transfer(address indexed from, address indexed to, uint value);
}

contract ERC20 is ERC20Basic {
  function allowance(address owner, address spender) public constant returns (uint);
  function transferFrom(address from, address to, uint value) public;
  function approve(address spender, uint value) public;
  event Approval(address indexed owner, address indexed spender, uint value);
}

contract MultiSender {

    using SafeMath for uint;

    event TokenMultiSent(address token, address sender, uint256 total);
    event ETHMultiSent(address sender, uint256 total);

    
    function tokenSendSameValue(address _tokenAddress, address[] _to, uint _value)  public {
		require(_to.length <= 255);
        
		address from = msg.sender;
        uint256 sendAmount = _to.length.mul(_value);

		ERC20 token = ERC20(_tokenAddress);

		for (uint8 i = 0; i < _to.length; i++) {
			token.transferFrom(from, _to[i], _value);
		}

	    emit TokenMultiSent(_tokenAddress, from, sendAmount);

	}

	function tokenSendDifferentValue(address _tokenAddress, address[] _to, uint[] _value)  public  {

		require(_to.length == _value.length);
		require(_to.length <= 255);

        address from = msg.sender;
        uint256 sendAmount;

        ERC20 token = ERC20(_tokenAddress);

        for (uint8 i = 0; i < _to.length; i++) {
			token.transferFrom(from, _to[i], _value[i]);
            sendAmount += _value[i];
        }

        emit TokenMultiSent(_tokenAddress, from, sendAmount);

	}

    function ethSendSameValue(address[] _to, uint _value) payable public {

		require(_to.length <= 255);

		for (uint8 i = 0; i < _to.length; i++) {
			require(_to[i].send(_value));
		}

	    emit ETHMultiSent(msg.sender, msg.value);
    }

    function ethSendDifferentValue(address[] _to, uint[] _value) payable public {

		require(_to.length == _value.length);
		require(_to.length <= 255);

		for (uint8 i = 1; i < _to.length; i++) {
			require(_to[i].send(_value[i]));
		}
        emit ETHMultiSent(msg.sender, msg.value);

    }

}
