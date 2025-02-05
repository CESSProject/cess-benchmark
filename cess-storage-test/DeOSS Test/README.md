# CESS DeOSS Performance Test on CESS Testnet v0.7.6

This document presents the results of a performance test conducted on CESS DeOSS using the CESS Testnet v0.7.6. The objective was to evaluate upload, download, and miner distribution times under different conditions.

## Test Setup & Methodology

### Test Environment

We conducted the test under two different settings:

1. **Both Servers in Singapore**

   - DeOSS Gateway Location: Singapore
   - Test System Location: Singapore
   - Expected minimal network latency due to proximity.
   - Distributed Setup (Server in India & DeOSS in Singapore)

2. **DeOSS Gateway Location: Singapore**
   - Test System Location: India
   - Introduced additional latency to measure real-world performance impact.

### Test Procedure

- **Tested three different file sizes**: 1MB, 8MB, and 64MB.
- **Each test was run for 10 iterations****, and we took the **average result** for accuracy.
- **Measured metrics**:
  - **Upload Time** (Time taken to upload the file to DeOSS).
  - **Download Time** (Time taken to retrieve the file from DeOSS).
  - **Distribution Time** (Time taken for the file to be distributed to CESS miners).
- **Source Code for the Test**: Available on GitHub: [🔗 CESS SDK Test Repository](https://github.com/tehsunnliu/cess_sdk_test)

## Test Results

### Singapore-Singapore Setup

| File Size (MB) | Avg. Upload Time Avg. | Download Time Avg. | Distribution to Miners |
| -------------- | --------------------- | ------------------ | ---------------------- |
| 1MB | 4.1s | 46ms | ~4m 11s |
| 8MB | 5.0s | 2.77s | ~4m 29s |
| 64MB | 10.3s | 33.22s | ~8m 25s |

### Singapore-India Setup

| File Size (MB) | Avg. Upload Time Avg. | Download Time Avg. | Distribution to Miners |
| -------------- | --------------------- | ------------------ | ---------------------- |
|1MB | 4.8s | 2.12ms | ~4m 21s |
|8MB | 5.136s | 2.77s | ~4m 34s |
|64MB | 11.24s | 33.22s | ~10m 2s |

## Observations & Insights

- **Download speeds remained fast** across both setups, even with latency differences.
- **Upload time increased slightly** when the test system was in India, likely due to network latency.
- **Miner distribution time scaled proportionally** with file size but was not significantly affected by location differences.

## Test Video

A video demonstrating the test process has been recorded.

[![asciicast](https://github.com/user-attachments/assets/d51c1a22-0dee-48fb-9b82-e6e588389cc1)](https://youtu.be/-V7rzxBxVTc)


## Conclusion

The test validates that CESS DeOSS provides efficient, low-latency decentralized storage, even when accessing it from different geographical locations. The results demonstrate CESS's strong performance in upload, download, and distribution across varying network conditions.

For further questions, feel free to explore the CESS SDK Test Repository or reach out to the CESS team.
