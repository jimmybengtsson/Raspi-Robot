let spawn = require('child_process').spawn;
let ffmpeg = require('fluent-ffmpeg');
let fs = require('fs-extra');


exports.connect = (req, res) => {

    const raspividOptions = ['-o', '-', '-t', '0', '-vf', '-w', '1280', '-h', '720', '-fps', '25'];
    const ffmpegInputOptions = [];
    const ffmpegOutputOptions = ['-vcodec copy', '-hls_flags delete_segments', '-hls_time 2', '-hls_list_size 1', '-live_start_index -1', '-g 25'];

    const cameraDirectory = './streamFiles';

    fs.ensureDir(cameraDirectory)
        .then(() => {

            let cameraStream = spawn('raspivid', raspividOptions);

            let conversion = new ffmpeg(cameraStream.stdout).noAudio().format('hls').inputOptions(ffmpegInputOptions).outputOptions(ffmpegOutputOptions).output(`${cameraDirectory}/livestream.m3u8`);

            conversion.on('error', function (err, stdout, stderr) {
                console.log('Cannot process video: ' + err.message);
            });

            conversion.on('start', function (commandLine) {
                console.log('Spawned Ffmpeg with command: ' + commandLine);
            });

            conversion.on('stderr', function (stderrLine) {
                console.log('Stderr output: ' + stderrLine);
            });

            conversion.run();

            return res.json({
                message: 'Camera right'
            });

        });

};