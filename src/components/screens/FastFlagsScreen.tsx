'use client';

import React, { useState } from 'react';
import { Copy, CheckCheck, Zap, Wifi } from 'lucide-react';
import { AlertBox } from '@/components/ui/Blocks';
import { PageTitle } from './HomeScreen';

// ── FLAG DATA ──────────────────────────────────────────────────
const FLAG_144_LOWPING = `{
  "FLogNetwork": "7",
  "DFIntS2PhysicsSenderRate": "128",
  "DFIntRakNetResendRttMultiple": "1",
  "DFIntRakNetNakResendDelayMs": "1",
  "DFIntRakNetLoopMs": "1",
  "DFIntRakNetSelectTimeoutMs": "1",
  "DFFlagRakNetEnablePoll": "True",
  "DFFlagSampleAndRefreshRakPing": "True",
  "DFIntClientPacketMaxDelayMs": "1",
  "DFIntClientPacketExcessMicroseconds": "1000",
  "DFIntMaxDataPacketPerSend": "100000",
  "DFIntNetworkInProcessLimitGameplayMsClient": "0",
  "DFIntNetworkQualityResponderMaxWaitTime": "1",
  "DFIntNetworkQualityResponderUnit": "10",
  "DFIntMegaReplicatorNetworkQualityProcessorUnit": "10",
  "DFIntMegaReplicatorNumParallelTasks": "12",
  "DFIntNetworkClusterPacketCacheNumParallelTasks": "12",
  "DFIntReplicationDataCacheNumParallelTasks": "12",
  "DFIntPhysicsReceiveNumParallelTasks": "12",
  "DFIntInterpolationNumParallelTasks": "12",
  "DFIntMaxReceiveToDeserializeLatencyMilliseconds": "10",
  "DFIntMaxAcceptableUpdateDelay": "1",
  "DFIntWaitOnUpdateNetworkLoopEndedMS": "100",
  "DFIntWaitOnRecvFromLoopEndedMS": "10",
  "DFIntHttpBatchApi_maxWaitMs": "40",
  "DFIntHttpBatchApi_minWaitMs": "5",
  "DFIntHttpBatchApi_cacheDelayMs": "15",
  "DFFlagNextGenRepRollbackOverbudgetPackets": "True",
  "DFFlagClampIncomingReplicationLag": "True",
  "DFFlagReplicatorSeparateVarThresholds": "True",
  "DFFlagHumanoidReplicateSimulated2": "True",
  "DFFlagReplicatorDisKickSize": "True",
  "DFFlagReplicateCreateToPlayer": "True",
  "DFFlagReplicatorCheckReadTableCollisions": "True",
  "FFlagLargeReplicatorRead2": "True",
  "FFlagLargeReplicatorWrite2": "True",
  "FFlagLargeReplicatorEnabled2": "True",
  "FFlagNextGenReplicatorEnabledRead2": "True",
  "DFIntTaskSchedulerTargetFps": "144",
  "FFlagTaskSchedulerLimitTargetFpsTo2402": "False",
  "DFIntTaskSchedulerJobInitThreads": "12",
  "DFIntTaskSchedulerJobInGameThreads": "12",
  "FIntTaskSchedulerAutoThreadLimit": "12",
  "DFFlagTaskSchedulerAvoidSleep": "True",
  "DFFlagFastEndUpdateLoop": "True",
  "FFlagFasterPreciseTime4": "True",
  "DFIntCharacterLoadTime": "1",
  "DFIntServerFramesBetweenJoins": "1"
}`;

const FLAG_FAST = `{
  "FLogNetwork": "7",
  "FFlagHandleAltEnterFullscreenManually": "False",
  "DFIntOcclusionShelfScalarNumerator": "2",
  "DFFlagFastEndUpdateLoop": "True",
  "FFlagFRMRefactor": "False",
  "DFIntWaitOnUpdateNetworkLoopEndedMS": "100",
  "FFlagUISUseLastFrameTimeInUpdateInputSignal": "True",
  "FFlagSimEnableDCD16": "True",
  "DFFlagReplicatorSeparateVarThresholds": "True",
  "FFlagFasterPreciseTime4": "True",
  "FIntDebugForceMSAASamples": "1",
  "DFIntNetworkClusterPacketCacheNumParallelTasks": "12",
  "FFlagLargeReplicatorRead2": "True",
  "FFlagPreComputeAcceleratorArrayForSharingTimeCurve": "True",
  "DFIntMegaReplicatorNumParallelTasks": "12",
  "FFlagUserBetterInertialScrolling": "True",
  "DFIntGraphicsOptimizationModeMaxFrameTimeTargetMs": "25",
  "DFIntGraphicsOptimizationModeMinFrameTimeTargetMs": "16",
  "DFIntCodecMaxOutgoingFrames": "1000",
  "FFlagDebugDisableTelemetryV2Stat": "True",
  "FFlagDebugDisableTelemetryV2Counter": "True",
  "DFFlagNextGenRepRollbackOverbudgetPackets": "True",
  "DFIntTaskSchedulerJobInitThreads": "12",
  "DFIntS2PhysicsSenderRate": "128",
  "DFFlagHumanoidReplicateSimulated2": "True",
  "FIntRuntimeMaxNumOfMutexes": "1000000",
  "FIntSSAOMipLevels": "0",
  "DFFlagPerformanceControlEnableMemoryProbing3": "True",
  "DFFlagMouseMoveOncePerFrame": "False",
  "DFIntRakNetResendRttMultiple": "1",
  "DFFlagMergeFakeInputEvents3": "True",
  "FIntSSAO": "0",
  "DFFlagAcceleratorUpdateOnPropsAndValueTimeChange": "True",
  "DFIntReplicationDataCacheNumParallelTasks": "12",
  "DFIntDebugPerformanceControlFrameTime": "2",
  "DFIntClientPacketMaxDelayMs": "1",
  "DFIntMegaReplicatorNetworkQualityProcessorUnit": "10",
  "FIntRuntimeMaxNumOfSchedulers": "1000000",
  "FFlagDebugDisableTelemetryEphemeralCounter": "True",
  "DFIntInitialAccelerationLatencyMultTenths": "1",
  "FFlagDebugDisableTelemetryEphemeralStat": "True",
  "FFlagDisablePostFx": "True",
  "DFIntMaxDataPacketPerSend": "100000",
  "DFIntRakNetNakResendDelayMs": "1",
  "FIntGrassMovementReducedMotionFactor": "0",
  "DFFlagClampIncomingReplicationLag": "True",
  "DFIntJoinDataCompressionLevel": "0",
  "DFIntDebugFRMQualityLevelOverride": "1",
  "FIntRenderGrassDetailStrands": "0",
  "FIntSmoothClusterTaskQueueMaxParallelTasks": "12",
  "DFFlagTaskSchedulerAvoidSleep": "True",
  "DFFlagSimSmoothedRunningController2": "True",
  "FIntRenderShadowIntensity": "0",
  "DFIntMaxReceiveToDeserializeLatencyMilliseconds": "10",
  "FFlagDebugDisableTelemetryEventIngest": "True",
  "DFIntPhysicsReceiveNumParallelTasks": "12",
  "FFlagDebugCheckRenderThreading": "True",
  "DFIntTargetTimeDelayFacctorTenths": "15",
  "FFlagDebugRenderCollectGpuCounters": "True",
  "FIntFRMMinGrassDistance": "0",
  "DFFlagDebugSkipMeshVoxelizer": "True",
  "FIntCameraMaxZoomDistance": "2147483647",
  "FIntDefaultJitterN": "0",
  "DFIntTextureQualityOverride": "0",
  "FIntRenderShadowmapBias": "0",
  "DFIntTeleportClientAssetPreloadingHundredthsPercentage": "100000",
  "FFlagSortKeyOptimization": "True",
  "FFlagSoundsUsePhysicalVelocity": "True",
  "DFIntCSGLevelOfDetailSwitchingDistanceL34": "0",
  "DFIntMaxProcessPacketsJobScaling": "10000",
  "DFIntClientPacketExcessMicroseconds": "1000",
  "DFIntMaxProcessPacketsStepsPerCyclic": "5000",
  "DFIntTaskSchedulerTargetFps": "9999",
  "FFlagDebugForceFutureIsBrightPhase2": "True",
  "DFIntInterpolationNumParallelTasks": "12",
  "FFlagLargeReplicatorEnabled2": "True",
  "FFlagRenderDynamicResolutionScale9": "True",
  "DFIntPerformanceControlReportingPeriodInMs": "700",
  "FFlagLuauCodegen": "True",
  "DFFlagTaskSchedulerAvoidSleep": "True",
  "DFFlagDebugPerfMode": "True",
  "FFlagMessageBusCallOptimization": "True",
  "FFlagNextGenReplicatorEnabledRead2": "True",
  "FFlagDebugGraphicsPreferD3D11": "True",
  "FIntLuaGcParallelMinMultiTasks": "12",
  "DFFlagSimOptimizeGeometryChangedAssemblies3": "True",
  "FIntRuntimeMaxNumOfThreads": "1000000",
  "FFlagQuaternionPoseCorrection": "True",
  "FFlagImproveShiftLockTransition": "True",
  "DFIntTaskSchedulerJobInGameThreads": "12",
  "DFIntMaxAcceptableUpdateDelay": "1",
  "FFlagLuaMenuPerfImprovements": "True",
  "FFlagGraphicsEnableD3D10Compute": "True",
  "FFlagPushFrameTimeToHarmony": "True",
  "DFFlagRakNetEnablePoll": "True",
  "FFlagDebugForceFutureIsBrightPhase3": "True",
  "DFIntRakNetLoopMs": "1",
  "FIntRuntimeMaxNumOfLatches": "1000000",
  "DFFlagReplicatorDisKickSize": "True",
  "FIntSimSolverResponsiveness": "2147483647",
  "FFlagUserShowGuiHideToggles": "True",
  "DFFlagSampleAndRefreshRakPing": "True",
  "FFlagLargeReplicatorWrite2": "True",
  "DFIntRakNetSelectTimeoutMs": "1",
  "FIntTaskSchedulerAutoThreadLimit": "12",
  "DFFlagUseVisBugChecks": "True",
  "FFlagVisBugChecksThreadYield": "True",
  "FFlagEnableVisBugChecks27": "True",
  "DFFlagReplicateCreateToPlayer": "True",
  "DFFlagReplicatorCheckReadTableCollisions": "True"
}`;

// ── COMPONENT ─────────────────────────────────────────────────
export default function FastFlagsScreen() {
  return (
    <div>
      <PageTitle icon="🎮">FAST FLAGS FOR ROBLOX</PageTitle>

      <p style={desc}>
        Fast Flags são configurações avançadas do Roblox que melhoram desempenho,
        reduzem lag e aumentam FPS. Copie o JSON da flag desejada e cole no arquivo
        <strong style={hl}> ClientAppSettings.json</strong> na pasta do Roblox.
      </p>

      <AlertBox type="warning">
        ⚠️ <strong>Como usar:</strong> Abra o explorador de arquivos →
        <code style={code}> %localappdata%\Roblox\Versions\</code> → abra a pasta mais recente →
        crie a pasta <code style={code}>ClientSettings</code> → crie o arquivo
        <code style={code}> ClientAppSettings.json</code> → cole o conteúdo abaixo.
      </AlertBox>

      <FlagCard
        title="🌐 144 Low Ping"
        icon={<Wifi size={18} />}
        description="Otimiza a rede para baixíssima latência, ideal para jogadores que querem máximo de 144 FPS com o menor ping possível. Reduz delay de pacotes, melhora replicação e aumenta estabilidade de conexão."
        benefits={['Ping mais baixo e estável', 'Menos rubber-band e lag', 'Replicação de rede mais rápida', 'Máximo de 144 FPS']}
        json={FLAG_144_LOWPING}
        color="#22d3ee"
      />

      <FlagCard
        title="⚡ Flags Rápidas"
        icon={<Zap size={18} />}
        description="Pack completo de otimização de desempenho: FPS máximo sem limite, gráficos otimizados, rede melhorada, telemetria desativada e threads maximizadas. Para o melhor desempenho geral no Roblox."
        benefits={['FPS praticamente ilimitado (9999)', 'Gráficos otimizados para performance', 'Telemetria da Roblox desativada', 'Threads e CPU ao máximo']}
        json={FLAG_FAST}
        color="#a855f7"
      />
    </div>
  );
}

// ── FLAG CARD ──────────────────────────────────────────────────
function FlagCard({ title, icon, description, benefits, json, color }: {
  title: string; icon: React.ReactNode; description: string;
  benefits: string[]; json: string; color: string;
}) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(json).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <div style={{ ...flagCard, borderColor: `${color}44` }}>
      {/* Left bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: color, borderRadius: '14px 0 0 14px', boxShadow: `0 0 12px ${color}` }} />
      {/* Top shimmer */}
      <div style={{ position: 'absolute', top: 0, left: 4, right: 0, height: 1, background: `linear-gradient(90deg, ${color}66, transparent 60%)` }} />

      <div style={{ paddingLeft: 8 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <span style={{ color, filter: `drop-shadow(0 0 6px ${color})` }}>{icon}</span>
          <h3 style={{ fontSize: 17, fontWeight: 900, color, textShadow: `0 0 10px ${color}66`, letterSpacing: '0.5px' }}>{title}</h3>
        </div>

        <p style={{ fontSize: 13, color: '#b8a8d0', lineHeight: 1.65, fontWeight: 500, marginBottom: 12 }}>{description}</p>

        {/* Benefits */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
          {benefits.map((b, i) => (
            <span key={i} style={{ background: `${color}18`, border: `1px solid ${color}44`, borderRadius: 20, padding: '3px 10px', fontSize: 12, color, fontWeight: 700 }}>
              ✓ {b}
            </span>
          ))}
        </div>

        {/* JSON preview */}
        <div style={{ background: '#06060f', border: `1px solid ${color}33`, borderRadius: 10, overflow: 'hidden', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', borderBottom: `1px solid ${color}22`, background: `${color}0a` }}>
            <span style={{ fontSize: 12, color: '#6b6b8a', fontWeight: 700 }}>ClientAppSettings.json</span>
            <button onClick={() => setExpanded(e => !e)} style={{ background: 'transparent', border: 'none', color: '#6b6b8a', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit', fontWeight: 700 }}>
              {expanded ? '▲ Recolher' : '▼ Ver JSON'}
            </button>
          </div>
          {expanded && (
            <pre style={{ padding: '12px 14px', fontSize: 11, color: '#8888aa', overflowX: 'auto', maxHeight: 280, margin: 0, lineHeight: 1.6 }}>
              {json}
            </pre>
          )}
        </div>

        {/* Copy button */}
        <button onClick={handleCopy} style={{ ...copyBtn, background: copied ? 'linear-gradient(135deg,#16a34a,#15803d)' : `linear-gradient(135deg,${color},${color}bb)`, boxShadow: copied ? '0 0 16px rgba(34,197,94,0.5)' : `0 0 16px ${color}66` }}>
          {copied ? <><CheckCheck size={16} /> JSON Copiado!</> : <><Copy size={16} /> Copiar JSON</>}
        </button>
      </div>
    </div>
  );
}

const desc: React.CSSProperties = { fontSize: 14, color: '#b8a8d0', lineHeight: 1.7, fontWeight: 500, marginBottom: 18 };
const hl: React.CSSProperties = { color: '#c084fc' };
const code: React.CSSProperties = { background: 'rgba(168,85,247,0.15)', color: '#c084fc', padding: '1px 6px', borderRadius: 4, fontSize: 12, fontFamily: 'monospace' };
const flagCard: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(168,85,247,0.06) 0%, #0a0a1e 100%)',
  border: '1px solid', borderRadius: 14, padding: '20px 22px',
  marginBottom: 20, position: 'relative', overflow: 'hidden',
};
const copyBtn: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 8,
  color: '#fff', border: 'none', borderRadius: 10,
  padding: '11px 24px', fontSize: 14, fontWeight: 900,
  cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.2s ease',
};
