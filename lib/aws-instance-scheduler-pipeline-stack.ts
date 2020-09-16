import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import { Construct, SecretValue, Stack, StackProps } from '@aws-cdk/core';
import { CdkPipeline, SimpleSynthAction } from "@aws-cdk/pipelines";
import { CdkpipelinesAwsInstanceSchedulerStage } from "./aws-instance-scheduler-stage";
// import { ManualApprovalAction } from '@aws-cdk/aws-codepipeline-actions';

/**
 * The stack that defines the application pipeline
 */
export class AwsInstanceSchedulerPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const sourceArtifact = new codepipeline.Artifact();
    const cloudAssemblyArtifact = new codepipeline.Artifact();
 
    // const pipeline = 
    const pipeline =  new CdkPipeline(this, 'AwsInstanceSchedulerPipeline', {
      // The pipeline name
      pipelineName: 'AwsInstanceSchedulerPipeline',
      cloudAssemblyArtifact,

      // Where the source can be found
      // Owener = Org
      sourceAction: new codepipeline_actions.GitHubSourceAction({
        actionName: 'GitHub',
        output: sourceArtifact,
        oauthToken: SecretValue.secretsManager('/ccoe-ssm-agent-pipeline/secrets/github/token'),
        owner: 'BoseCorp',
        repo: 'aws-instance-scheduler',
      }),

       // How it will be built and synthesized
       synthAction: SimpleSynthAction.standardNpmSynth({
         sourceArtifact,
         cloudAssemblyArtifact,
         
         // We need a build step to compile the TypeScript Lambda
         buildCommand: 'npm run build'
       }),
    });

    // This is where we add the application stages
    pipeline.addApplicationStage(new CdkpipelinesAwsInstanceSchedulerStage(this, 'GD-Sandbox', {
      env: { account: '597737828455', region: 'us-east-1' }
    }));
    
    // pipeline.addApplicationStage(new CdkpipelinesAwsInstanceSchedulerStage(this, 'CCoE-Tools', {
    //   env: { account: '543232713813', region: 'us-east-1' }
    // }));
    
    // pipeline.addApplicationStage(new CdkpipelinesSSMRegStage(this, 'Shared-Services', {
    //   env: { account: '164705996232', region: 'us-east-1' }
    // }));
    
    // pipeline.addApplicationStage(new CdkpipelinesSSMRegStage(this, 'CIS-Sandbox', {
    //   env: { account: '544135626450', region: 'us-east-1' }
    // }));
    
    // ccoe_tools_deploy.addActions(new ManualApprovalAction({
    //   actionName: 'ManualApproval',
    //   runOrder: ccoe_tools_deploy.nextSequentialRunOrder(),
    // }));
    
  }
}
