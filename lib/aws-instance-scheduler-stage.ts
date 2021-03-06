import { Construct, Stage, StageProps } from '@aws-cdk/core';
import { AwsInstanceSchedulerStack } from './aws-instance-scheduler-stack';

/**
 * Deployable unit of web service app
 */
export class CdkpipelinesAwsInstanceSchedulerStage extends Stage {
  
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);
    
    const SOLUTION_VERSION = process.env['DIST_VERSION'] || 'bose1';
    const SOLUTION_NAME = 'aws_instance_scheduler';
    const SOLUTION_ID = 'v1';
    const SOLUTION_BUCKET = 'ccoe-sched-pipeline';
    const SOLUTION_TMN = 'AWS Solution Development';
    const SOLUTION_PROVIDER = 'AWS Solution Development';

    new AwsInstanceSchedulerStack(this, 'AwsInstanceScheduler', {
    description: '(' + SOLUTION_ID + ') - ' + SOLUTION_NAME + ', version ' + SOLUTION_VERSION,
    solutionId: SOLUTION_ID,
    solutionTradeMarkName: SOLUTION_TMN,
    solutionProvider: SOLUTION_PROVIDER,
    solutionBucket: SOLUTION_BUCKET,
    solutionName: SOLUTION_NAME,
    solutionVersion: SOLUTION_VERSION
    });
    
    
  }
}