import { Construct, Stage, StageProps } from '@aws-cdk/core';
import { AwsInstanceSchedulerStack } from './aws-instance-scheduler-stack';

/**
 * Deployable unit of web service app
 */
export class CdkpipelinesAwsInstanceSchedulerStage extends Stage {
  
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    new AwsInstanceSchedulerStack(this, 'AwsInstanceScheduler');
    
    
  }
}