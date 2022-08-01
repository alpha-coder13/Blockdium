import React from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import chains from './chainmetadata.json';

export default function Login(){

    const Chains=chains.chains;

    return (
        <div>
            select chain<br/>
            {
                Chains.map((chain)=>{

                    const chainselector=()=>{

                        window.ethereum.request({
                            'method':'eth_chainId'
                        }).then((data)=>{
                            if(data==chain.chainId)console.log("already added");
                        })

                        window.ethereum.request({
                            'method':'wallet_switchEthereumChain',
                            'params':[{'chainId':`${chain.chainId}`}]
                        })
                        .then(()=>console.log("chain switched"))
                        .catch((err)=>{
                            if(err.code == 4902)window.ethereum.request({
                                'method':'wallet_addEthereumChain',
                                'params':[
                                    {
                                        "chainId":`${chain.chainId}`,
                                        "chainName":`${chain.chainName}`,
                                        "nativeCurrency":{
                                            "name":`${chain.nativeCurrency.name}`,
                                            "symbol":`${chain.nativeCurrency.symbol}`,
                                            "decimals":parseInt(`${chain.nativeCurrency.decimals}`)
                                        },
                                        "rpcUrls":chain.rpcUrls,
                                        "blockExplorerUrls?":chain.blockExplorerUrls
                                    }
                                ]
                            })
                            .then(()=>console.log("chain successfully added"))
                            .catch(()=>console.log("wrong chain code"))
                        })
                    }
                    return(<button onClick={chainselector}>{chain.chainName}</button>)
                })
            }<br/>
            Login<br/>
            <button>Login</button><button>SignUp</button>
        </div>   
    )
}