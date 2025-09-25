import { toNano } from '@ton/core';
import { EscrowSystem } from '../wrappers/EscrowSystem';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const escrowSystem = provider.open(EscrowSystem.createFromConfig({
        queryId:0,
        owner:provider.sender().address!
    }, await compile('EscrowSystem')));

    await escrowSystem.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(escrowSystem.address);

    // run methods on `escrowSystem`
}
