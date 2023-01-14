import { Button } from '@mui/material';
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    if (!window.keplr) {
      alert('Please install keplr extension');
    }
  }, []);

  const openWallet = async () => {
    const chainId = 'colosseum-1';

    try {
      await window.keplr.enable(chainId);
      alert('Connected to wallet!')
    } catch (error) {
      alert('error : ' + error);
    }
  };

  const getAddress = async () => {
    const chainId = 'colosseum-1';

    try {
      await window.keplr.enable(chainId);

      const offlineSigner = window.getOfflineSigner(chainId);
      const accounts = await offlineSigner.getAccounts();
      alert('address : ' + accounts[0].address);
    } catch (error) {
      alert('error : ' + error);
    }
  };

  const sign = async () => {
    const chainId = 'colosseum-1';

    try {
      await window.keplr.enable(chainId);

      const result1 = await window.keplr.getKey(chainId);
      let address = result1.bech32Address;

      const rawCertificate = '3936a4db-1d18-4cb6-8274-bccb1541f021';

      let certificateData = "The signature requested by exchange.\n\nProceed to confirm your own ownership of Kepler's wallet.\nPlease proceed after checking the registered wallet address at the time of deposit and withdrawal.\n\nAddress:\n" + address + '\nCertificate:\n' + rawCertificate;

      let signatureResult = await window.keplr.signArbitrary(chainId, address, certificateData);
      console.log(signatureResult);

      let isMatched = await window.keplr.verifyArbitrary(chainId, address, certificateData, signatureResult);
      console.log(isMatched);

      if (isMatched) {
        alert('Wallet address registration completed.');
      } else {
        alert('Wallet address registration failed.');
      }
    } catch (error) {
      alert('Wallet address registration failed : ' + error);
    }
  };

  return (
    <div className="App">
      <Button variant="contained" size="large" color="info" onClick={openWallet}>
        Connect Kepler Wallet
      </Button>
      <Button variant="contained" size="large" color="info" onClick={getAddress}>
        getAddress
      </Button>
      <Button variant="contained" size="large" color="info" onClick={sign}>
        Sign
      </Button>
    </div>
  );
}

export default App;
